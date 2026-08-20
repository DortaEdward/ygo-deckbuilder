import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const JSON_PATH = path.join("data", 'cards.json') // adjust to your actual file location
const OUTPUT_DIR = path.join(__dirname, 'images')
const CONCURRENCY = 8 // stay comfortably under ygoprodeck's 20 req/sec limit
const RETRY_LIMIT = 3

async function downloadImage(url, destPath, attempt = 1) {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(destPath, buffer)
  } catch (err) {
    if (attempt < RETRY_LIMIT) {
      await sleep(500 * attempt)
      return downloadImage(url, destPath, attempt + 1)
    }
    throw err
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function runWithConcurrency(items, limit, worker) {
  let index = 0
  let active = 0
  let completed = 0

  return new Promise((resolve) => {
    function next() {
      if (completed === items.length) {
        resolve()
        return
      }
      while (active < limit && index < items.length) {
        const currentIndex = index++
        active++
        worker(items[currentIndex], currentIndex)
          .catch((err) => {
            console.error(`Failed: ${err.message}`)
          })
          .finally(() => {
            active--
            completed++
            next()
          })
      }
    }
    next()
  })
}

async function main() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error(`JSON file not found at ${JSON_PATH}`)
    process.exit(1)
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const raw = fs.readFileSync(JSON_PATH, 'utf-8')
  const parsed = JSON.parse(raw)
  const cards = parsed.data

  const tasks = cards
    .filter((card) => card.card_images?.[0]?.image_url)
    .map((card) => {
      const image = card.card_images[0]
      const destPath = path.join(OUTPUT_DIR, `${card.id}.jpg`)
      return { id: card.id, name: card.name, url: image.image_url, destPath }
    })
    .filter((task) => !fs.existsSync(task.destPath)) // skip already-downloaded

  console.log(`Total cards: ${cards.length}`)
  console.log(`Images to download: ${tasks.length} (skipping already-downloaded)`)

  let done = 0
  let failed = 0

  await runWithConcurrency(tasks, CONCURRENCY, async (task) => {
    try {
      await downloadImage(task.url, task.destPath)
      done++
      if (done % 100 === 0) {
        console.log(`Progress: ${done}/${tasks.length}`)
      }
    } catch (err) {
      failed++
      console.error(`✗ Failed [${task.id}] ${task.name}: ${err.message}`)
    }
  })

  console.log(`\nDone. ${done} downloaded, ${failed} failed, ${tasks.length - done - failed} skipped mid-run.`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
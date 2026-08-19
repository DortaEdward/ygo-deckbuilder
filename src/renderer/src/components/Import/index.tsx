import { useEffect, useState } from 'react'

interface ImportProgress {
    phase: 'reading' | 'inserting' | 'done' | 'error'
    processed: number
    total: number
    message?: string
}

export default function ImportButton() {
    const [progress, setProgress] = useState<ImportProgress | null>(null)
    const [importing, setImporting] = useState(false)

    useEffect(() => {
        const cleanup = window.api.onImportProgress((p: ImportProgress) => {
            setProgress(p)
        })
        return cleanup
    }, [])

    async function handleImport() {
        setImporting(true)
        setProgress(null)
        const result = await window.api.importCards()
        setImporting(false)

        if (result.success) {
            console.log(`Imported ${result.cardsImported} cards, ${result.setsImported} set entries`)
        } else {
            console.error('Import failed:', result.error)
        }
    }

    return (
        <div className='text-gray-50'>
            <button onClick={handleImport} disabled={importing}>
                {importing ? 'Importing...' : 'Import Cards'}
            </button>
            {progress && progress.phase === 'inserting' && (
                <p>
                    {progress.processed} / {progress.total} cards
                </p>
            )}
            {progress?.phase === 'done' && <p>Import complete!</p>}
            {progress?.phase === 'error' && <p>Error: {progress.message}</p>}
        </div>
    )
}
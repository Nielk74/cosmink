import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Import() {
    return(
        <>
            <div className='font-[family-name:var(--font-geist-sans)]'>
                Import your data here
            </div>
            <Link href="/dashboard">
                <Button size="medium" variant="primary" className='font-[family-name:var(--font-geist-mono)]'>
                    Dashboard
                </Button>
            </Link>
        </>
    )
}
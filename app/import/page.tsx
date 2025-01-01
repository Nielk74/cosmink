import Link from 'next/link';
import Button from '@mui/material/Button';

export default function Import() {
    return(
        <>
            <div className='font-[family-name:var(--font-geist-sans)]'>
                Import your data here
            </div>
            <Link href="/project/view">
                <Button variant="contained" size="large">
                    Go to Dashboard
                </Button>
            </Link>
        </>
    )
}
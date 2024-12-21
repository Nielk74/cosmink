import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Import() {
    return(
        <>
    <div>
        Import your data here
    </div>
    <Button size="medium" variant="primary">
        <Link href="/dashboard">Dashboard</Link>
    </Button>
    </>
    )
}
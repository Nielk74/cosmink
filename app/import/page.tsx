import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Import() {
    return(
        <>
            <div>
                Import your data here
            </div>
            <Link href="/dashboard">
                <Button size="medium" variant="primary">
                    Dashboard
                </Button>
            </Link>
        </>
    )
}
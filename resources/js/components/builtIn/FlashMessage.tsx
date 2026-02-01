import { MessageCircleWarning } from 'lucide-react';
import { useEffect, useState } from 'react';
type Props = {
    message: { error?: string | null; success: string | null };
    duration?: number;
};
const FlashMessage = ({ message, duration = 5000 }: Props) => {
    const [displayMessage, setDisplayMessage] = useState<string | null>(null);
    useEffect(() => {
        setDisplayMessage(message.error ? message.error : message.success);
        if (message.error || message.success) setTimeout(() => setDisplayMessage(null), duration);
    }, [message.error, message.success, duration]);

    return (
        <>
            {displayMessage && (
                <div
                    className={`${message.success ? 'border-green-500 text-green-500 dark:bg-green-500/15' : 'border-yellow-500 text-yellow-500 dark:bg-yellow-500/15'} Error rounded-sm border bg-white/10 px-2 py-2 text-center md:py-3`}
                >
                    {message.error ? (
                        <>
                            <MessageCircleWarning className="mr-2 inline" />
                            <p className="text-sm md:text-lg">{message.error}</p>
                        </>
                    ) : (
                        message.success
                    )}
                </div>
            )}{' '}
        </>
    );
};

export default FlashMessage;

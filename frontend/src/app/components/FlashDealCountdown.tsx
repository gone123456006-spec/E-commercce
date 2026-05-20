import { useEffect, useState } from 'react';

type FlashDealCountdownProps = {
  endAt?: string;
};

export function FlashDealCountdown({ endAt }: FlashDealCountdownProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const flashEndsAt = endAt ? new Date(endAt) : new Date();
  if (!endAt) {
    flashEndsAt.setHours(23, 59, 59, 999);
  }

  const remainingMs = Math.max(0, flashEndsAt.getTime() - now);
  const hrs = String(Math.floor(remainingMs / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((remainingMs % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, '0');

  return (
    <div className="mb-3 flex justify-center">
      <div className="text-xs sm:text-sm font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded">
        Ends in {hrs}:{mins}:{secs}
      </div>
    </div>
  );
}

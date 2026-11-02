
const statusOrder = ["pending", "Confirmed", "Completed", "Cancelled"];
export default function ProgressTracker({ status }: { status: string }) {
  const isCancelled = status === "Cancelled";
  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {statusOrder.map((step, index) => {
        const active = isCancelled
          ? step === "Cancelled"
          : index <= currentIndex;

        return (
          <div key={step} className="flex items-center gap-1.5">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                active
                  ? isCancelled
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-primary bg-primary text-white"
                  : "border-border text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>

            <span
              className={`text-xs ${
                active
                  ? isCancelled
                    ? "font-semibold text-red-600"
                    : "font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
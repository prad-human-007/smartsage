export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      <div className="text-foreground border-l-2 border-foreground px-4">
          {message}
        </div>
    </div>
  );
}
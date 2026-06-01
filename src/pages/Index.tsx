import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xvzdgezn", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setStatus("idle"), 300);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex justify-end px-6 md:px-12 py-6">
        <button
          onClick={() => setOpen(true)}
          className="text-xs font-medium tracking-widest uppercase text-foreground border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-300"
        >
          Contact Us
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <img src="/assets/rv-logo.png" alt="Rock Vntrs" className="w-64 md:w-80 lg:w-96 mix-blend-multiply" />
        </div>
      </main>

      <footer className="py-6 text-center">
        <p className="text-xs text-muted-foreground/50 tracking-wide">© 2026 Rock Vntrs GmbH</p>
      </footer>

      <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
        <DialogContent className="bg-background border-border max-w-md p-8 rounded-none sm:rounded-sm">
          <VisuallyHidden><DialogTitle>Contact Us</DialogTitle></VisuallyHidden>
          {status === "success" ? (
            <div className="text-center py-8">
              <p className="text-foreground text-lg font-light mb-2">Thank you.</p>
              <p className="text-muted-foreground text-sm">We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-lg tracking-widest uppercase text-foreground font-light">Get in Touch</h2>
              {status === "error" && (
                <p className="text-sm text-destructive">Something went wrong. Please try again.</p>
              )}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
              <input name="name" type="text" placeholder="Name" required className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm" />
              <input name="email" type="email" placeholder="Work Email" required className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm" />
              <textarea name="message" placeholder="Message" rows={3} required className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm resize-none" />
              <button type="submit" disabled={status === "submitting"} className="text-xs tracking-widest uppercase bg-foreground text-background px-6 py-3 hover:opacity-90 transition-opacity duration-300 disabled:opacity-50">
                {status === "submitting" ? "Sending..." : "Send"}
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

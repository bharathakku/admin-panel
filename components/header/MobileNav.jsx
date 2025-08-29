"use client";
import { Dialog } from "@headlessui/react";


export default function MobileNav({ open, onClose, children }) {
return (
<Dialog open={open} onClose={onClose} className="relative z-50 md:hidden">
<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
<div className="fixed inset-0 flex">
<Dialog.Panel className="bg-black w-72 max-w-[85%] h-full shadow-xl">{children}</Dialog.Panel>
<div className="flex-1" onClick={onClose} />
</div>
</Dialog>
);
}
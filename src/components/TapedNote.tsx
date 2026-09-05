export default function TapedNote() {
  return (
    <div
      id="taped-note-element"
      className="relative p-3 sm:p-4 bg-[#090909] border border-[#1f1f1f] text-[#888888] font-mono text-[11px] sm:text-xs leading-relaxed tracking-wider shadow-lg max-w-[180px] sm:max-w-[210px] select-none hover:text-[#c4c4c4] transition-colors duration-300"
    >
      {/* Scotch tape on top */}
      <div
        className="scotch-tape absolute -top-3 left-6 w-12 sm:w-14 h-4 sm:h-5 -rotate-3 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Scotch tape on bottom corner */}
      <div
        className="scotch-tape absolute -bottom-2 -right-3 w-10 sm:w-12 h-3.5 sm:h-4 rotate-12 z-10 pointer-events-none opacity-70"
        aria-hidden="true"
      />

      <p>beberapa hal</p>
      <p>memang ga harus</p>
      <p className="text-[#a3a3a3]">jelas.</p>
    </div>
  );
}

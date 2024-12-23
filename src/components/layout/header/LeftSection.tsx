export default function LeftSection() {
  return (
    <div className="flex w-[265px] shrink-0 items-center">
      <div className="flex items-center justify-center">
        <div className="mx-1 size-12 p-3">
          <svg focusable="false" viewBox="0 0 24 24" width="24" height="24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </div>

        <img src="./calendar.png" alt="Logo" className="mb-1 h-10 w-11 pr-1" />

        <h1 className="block pl-1 text-[22px] text-google_gray">Calendar</h1>
      </div>
    </div>
  );
}

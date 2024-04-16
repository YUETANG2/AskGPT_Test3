function Header() {
  return (
    <div class=" bg-zinc-400 ">
      <div class="grid gap-0 grid-cols-4 grid-rows-1 px-8 py-6  bg-zinc-700">
        <div>
          <span class="dot bg-zinc-200"></span>
        </div>
        <p class="font-mono text-xl text-gray-100"> AskGenie </p>
        <span> {} </span>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" class="sr-only peer" checked />
          <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">
            Dark Mode
          </span>
        </label>
      </div>
    </div>
  );
}

export default Header;

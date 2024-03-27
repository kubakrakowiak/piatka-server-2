export default function Header({data, target, title}) {
    return (
        <div>
            <div className="pb-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-l font-semibold text-gray-500">
                        {title} ({data ? data.length : 0})
                    </h2>

                    <a href={`/${target}/add`}
                       className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Dodaj
                    </a>

                </div>
            </div>
        </div>
    )
}

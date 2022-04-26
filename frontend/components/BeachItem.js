export function BeachItem({ data: { name, stars, reviews, imageSrc }, index }) {
  const url = `https://www.google.com.au/search?q=${name.replace(" ", "+")}`;
  const imageUrl = `${url}&tbm=isch`;
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col w-full items-center bg-white rounded-xl px-6 pt-4 pb-6 space-x-3 space-y-2 border border-gray-300">
        <div className="relative rounded-xl overflow-hidden">
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className=""
            alt={`Images for ${name}`}
            title={`Images for ${name}`}
          >
            <img src={imageSrc} className="w-72 h-52 object-cover" />
          </a>
          <div className="absolute top-0.5 left-1 text-5xl font-bold text-white text-shadow">{index + 1}</div>
        </div>

        <div className="flex flex-col items-center w-full space-y-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-2xl font-semibold capitalize hover:underline"
            alt={`Google ${name}`}
            title={`Google ${name}`}
          >
            {name}
          </a>
          <div className="flex w-full items-center justify-center text-base space-x-2">
            <div className="bg-gray-200 rounded-lg px-2">{stars}</div>
            <div>·</div>
            <div className="text-gray-600">{reviews} reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeachItem({ data: { name, stars, reviews, ranking, imageSrc }, index }) {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col w-full items-center bg-white rounded-2xl px-6 pt-4 pb-6 space-x-3 space-y-2 shadow-lg">
        <div className="relative">
          <img src={imageSrc} className="rounded-2xl w-72 h-auto object-contain" />
          <div className="absolute top-1 left-2 text-5xl font-bold text-white text-shadow">{index + 1}</div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="text-3xl capitalize">{name}</div>
          <div className="flex items-center space-x-2">
            <div className="bg-amber-200 rounded-lg px-2">{stars}</div>
            <div>·</div>
            <div className="text-gray-600">{reviews} reviews</div>
          </div>
          {/* <div className="">{ranking}</div> */}
        </div>
      </div>
    </section>
  );
}

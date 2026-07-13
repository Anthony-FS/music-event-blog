function HeroSection() {
  return (
    <section className="w-full px-5 py-14 sm:px-8 sm:py-20 lg:px-28 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[minmax(190px,1fr)_minmax(220px,300px)_minmax(190px,1fr)] md:gap-8 lg:grid-cols-[1fr_minmax(240px,360px)_1fr] lg:gap-14">
        <div className="mx-auto max-w-[320px] text-center md:ml-auto md:mr-0 md:justify-self-end md:text-right">
          <h1 className="text-center text-[34px] font-bold leading-[1.08] text-[#28241f] sm:text-[40px] md:text-right! lg:text-[44px]">
            Music
            <br className="hidden sm:block" />{' '}
            Festivals,
            <br /> All Around
          </h1>
          <p className="mt-6 text-center text-xs font-medium leading-[1.45] text-[#75716b] sm:text-[13px] md:text-right!">
            Discover a World of Sound at Your Fingertips.
            <br className="hidden sm:block" />{' '}
            Your Daily Dose of Music Festivals and Events.
          </p>
        </div>

        <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-lg sm:max-w-[380px] md:max-w-none">
          <img
            src="/images/myphoto.jpg"
            alt="Author portrait"
            className="aspect-4/5 h-full w-full object-cover"
            loading="eager"
          />
        </div>

        <div className="mx-auto max-w-[310px] text-center md:mx-0 md:text-left!">
          <p className="text-[10px] font-medium leading-none text-[#75716b]">
            -Author
          </p>
          <h2 className="mt-2 text-xl font-bold leading-tight text-[#43403b]">
            Anthony FS.
          </h2>
          <p className="mt-3 text-[13px] font-medium leading-[1.45] text-[#75716b]">
            I am a fullstack developer in training who loves music. This blog is
            to share some past music events and future events to look forward to.
          </p>
          <p className="mt-5 text-[13px] font-medium leading-[1.45] text-[#75716b]">
            If you enjoy music then this is the place to be.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

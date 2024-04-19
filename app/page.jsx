import Feed from "@components/Feed"

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text blue_gradient text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="red_gradient text-center">
                    AI-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center text-blue-800">
                PlotForge is an open source AI prompting tool or modern world to discover, share and create creative prompts.
            </p>
            {/* :TODO: FEED COMPONENT */}
            <Feed />
        </section>
    )
}

export default Home
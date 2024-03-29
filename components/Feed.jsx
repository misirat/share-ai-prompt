'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            )
            )}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [searchTimeout, setsearchTimeout] = useState(null)
    const [searchedResults, setSearchedResults] = useState([])
    const [posts, setPosts] = useState([])

    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, "i");                  // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    }

    const handleSearchChange = (event) => {
        clearTimeout(searchTimeout)
        setSearchText(event.target.value)

        setsearchTimeout(setTimeout(() => {
            const searchResult = filterPrompts(event.target.value);
            setSearchedResults(searchResult);
        }, 500))
        // const searchResult = filterPrompts(event.target.value)
        // setSearchedResults(searchResult)
    }

    const handleTagClick = (tag) => {
        setSearchText(tag)
        const searchResult = filterPrompts(tag)
        setSearchedResults(searchResult)
    }

    useEffect(() => {

        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
        }

        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center">
                <input
                    className="search_input peer"
                    type="text"
                    placeholder="search for a tag/prompt/username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required />
            </form>
            {
                searchText ? (
                    <PromptCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                    />
                ) : (
                    <PromptCardList
                        data={posts}
                        handleTagClick={handleTagClick}
                    />

                )
            }
        </section>
    )
}

export default Feed
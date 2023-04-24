import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Stack } from "react-bootstrap";
import axios from "axios";
import { EntryContext } from "../pages/home";

export default function StoryHome({ ...props }) {
    const [prompt, setPrompt] = useState("");
    // const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState([]);
    const [updated, setUpdated] = useContext(EntryContext);
    const [storyID, setStoryID] = useState("")

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/stories`)
                .then((response) => {
                    let Data = response.data
                    const story = Data.filter(story => story.active === "1");
                    const prompt = story[0].prompt;
                    const title = story[0].title;
                    props.storyID(story[0]._id)
                    setStoryID(story[0]._id)
                    setPrompt(prompt)
                    setTitle(title)

                })
        } catch (error) {
            // console.log(error.response.data)
            console.log(error)
        }
    }, [storyID, updated]);

    useEffect(() => {
        if (!storyID) {
            return
        } else {
            try {
                axios.get(`${process.env.REACT_APP_BASE_URL}/stories/${storyID}/entries`)
                    .then((response) => {
                        const story = response.data
                        if (story.length > 0 && story[0]._id !== plot[0]?._id) {
                            // setPlot(story)
                            setPlot(prevPlot => [...story])
                        } else {
                            return
                        }
                    })
            } catch (error) {
                alert(error.response.data)
            }
        }
    }, [updated, storyID]);

    return (
        <>
            <Stack gap={3}>
                <Stack gap={3}>
                    <div className="img"></div>
                    <h3>Prompt:</h3>
                    {prompt}
                </Stack>
                <Stack>
                    <h3>Title:</h3>
                    {title}
                </Stack>
                <Stack>
                    <h3>Plot:</h3>
                    <div>
                        {plot.map((plotPoint) => (
                            <p key={plotPoint._id}>
                                {plotPoint.content}
                            </p>
                        ))}
                    </div>
                </Stack>
            </Stack>
        </>
    )
}

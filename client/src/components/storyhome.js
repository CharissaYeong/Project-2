import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Stack } from "react-bootstrap";
import axios from "axios";

export default function StoryHome() {
    const [prompt, setPrompt] = useState("");
    const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState([]);
    const [storyID, setstoryID] = useState("");
    const [Active, setActive] = useState("");

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/storyhome')
                .then((response) => {
                    let Data = response.data
                    const story = Data.filter(story => story.story_id === "1");
                    const prompt = story[0].prompt;
                    const title = story[0].title;
                    const plot = story[0].plot;
                    setPrompt(prompt)
                    setTitle(title)
                    setPlot(plot)
                })
        } catch (error) {
            // console.log(error.response.data)
            alert(error.response.data)
        }
      }, []);

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
                    {/* {Plot} */}
                    <div>
                        {plot.map((plotPoints, index) => {
                            return (
                                <p key={index}>
                                    {plotPoints}
                                </p>
                            );
                        })}
                    </div>
                </Stack>
            </Stack>
        </>
    )
}
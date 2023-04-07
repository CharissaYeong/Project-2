import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Stack } from "react-bootstrap";
import axios from "axios";
import { EntryContext } from "../pages/home";

export default function StoryHome(props) {
    const [prompt, setPrompt] = useState("");
    const [cover, setCover] = useState("");
    const [title, setTitle] = useState("");
    const [plot, setPlot] = useState([]);
    const [Active, setActive] = useState("");
    const [updated, setUpdated] = useContext(EntryContext)

    useEffect(() => {
        try {
            axios.get('http://localhost:3001/storyhome')
                .then((response) => {
                    let Data = response.data
                    const story = Data.filter(story => story.active === "1");
                    const prompt = story[0].prompt;
                    const title = story[0].title;
                    const plot = story[0].plot;
                    props.storyID(story[0]._id)
                    setPrompt(prompt)
                    setTitle(title)
                    setPlot(plot)
                })
        } catch (error) {
            // console.log(error.response.data)
            alert(error.response.data)
        }
      }, []);

    //   useEffect(() => {
    //     try {
    //         axios.get('http://localhost:3001/storyhome')
    //             .then((response) => {
    //                 let Data = response.data
    //                 const story = Data.filter(story => story.active === "1");
    //                 const plot = story[0].plot;
    //                 setPlot(plot)
    //             })
    //     } catch (error) {
    //         // console.log(error.response.data)
    //         alert(error.response.data)
    //     }
    //   }, [updated]);

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
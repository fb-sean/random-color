async function Eval() {
    let input = prompt("Password?", "1234 isses nich")

    if(input === "2345") {
        input = prompt("What should I eval?")

        if(input != " " && input != null) {
            const response = await eval(input);

            setTimeout(() => {
                return alert(`${response}`)
            }, 500)
        } else {
            return;
        }
    } else if (input == null || input == "") {
        return;
    } else {
        alert(`Ich hab doch gesagt ${input} isses nich :(`)
    }
}

let Cache = []; // Last Cache

function getLastStats() {
    if(Cache.length > 0) {
        return alert(`${Cache.join(" ")}`)
    } else {
        alert("No Last Stats.")
    }
}



function ButtonPress() {
    let input = prompt("How many runs?", "20");
    const [
        runs,
        timeout
    ] = input.split(",");

    if (runs == null || runs == "") {
        alert("You didn't gave me a number... :(")
    } else if (isNaN(runs)) {
        alert(`${runs} isn't a number.. :(`)
    } else {
        if (Number(runs) > 4000 || Number(timeout) < 2) return alert("Chill mate your computer can't handle this.")


        input = prompt("What you bet whats the Most Used Color? (Optional)");
        let color = input;
        createColors(Number(runs), timeout, color);
    }
};


function createColors(runs = 20, timeout = 250, color) {
    const ColorArray = new Array(
        "Red",
        "Green",
        "Blue",
        "Yellow",
        "Purple",
        "Orange",
        "Black",
        "Aquamarine",
        "Aqua",
        "Brown",
    );

    function getRandom(Array) {
        return {
            rColor: Array[Math.floor(Math.random() * Array.length)],
            rStyle: Array[Math.floor(Math.random() * Array.length)],
        }
    }

    const now = new Date()
    let number = 1;
    const waitTexts = new Array(
        "Creating...",
        "Please wait until I created all Colors!"
    )

    if (waitTexts.includes(document.getElementById('infoText').innerHTML)) {
        document.getElementById('infoText').innerHTML = waitTexts[1];
        return alert(waitTexts[1]);
    } else if (document.getElementById('infoText').innerHTML.includes("Created")) {
        document.getElementById('demo').innerHTML = ` `;
        document.getElementById('infoText').innerHTML = waitTexts[0];
    } else document.getElementById('infoText').innerHTML = waitTexts[0];
    const ColorStats = {
        Colors: {
            Red: 0,
            Green: 0,
            Blue: 0,
            Yellow: 0,
            Purple: 0,
            Orange: 0,
            Black: 0,
            Aquamarine: 0,
            Aqua: 0,
            Brown: 0,
        },
        ColorNames: {
            Red: 0,
            Green: 0,
            Blue: 0,
            Yellow: 0,
            Purple: 0,
            Orange: 0,
            Black: 0,
            Aquamarine: 0,
            Aqua: 0,
            Brown: 0,
        },
    }


    Cache = [];
    for (i = 0; i < runs; i++) {
        setTimeout(() => {
            const {
                rColor,
                rStyle
            } = getRandom(ColorArray);
            number++;

            ColorStats.ColorNames[rColor] = Number(ColorStats.ColorNames[rColor]) + 1;
            ColorStats.Colors[rStyle] = Number(ColorStats.Colors[rStyle]) + 1;



            if (number === 1) document.getElementById('demo').innerHTML = `<p style="color:${rStyle}">` + rColor + "</p>";
            else document.getElementById('demo').innerHTML = document.getElementById('demo').innerHTML + `<p style="color:${rStyle}">` + rColor + "</p>";


            if (number === (runs + 1)) {
                let Added_Text = ``;




                const MostUsed2 = [{
                        Name: "Red",
                        Stats: ColorStats.ColorNames.Red + ColorStats.Colors.Red
                    },
                    {
                        Name: "Green",
                        Stats: ColorStats.ColorNames.Green + ColorStats.Colors.Green
                    },
                    {
                        Name: "Blue",
                        Stats: ColorStats.ColorNames.Blue + ColorStats.Colors.Blue
                    },
                    {
                        Name: "Yellow",
                        Stats: ColorStats.ColorNames.Yellow + ColorStats.Colors.Yellow
                    },
                    {
                        Name: "Purple",
                        Stats: ColorStats.ColorNames.Purple + ColorStats.Colors.Purple
                    },
                    {
                        Name: "Orange",
                        Stats: ColorStats.ColorNames.Orange + ColorStats.Colors.Orange
                    },
                    {
                        Name: "Black",
                        Stats: ColorStats.ColorNames.Black + ColorStats.Colors.Black
                    },
                    {
                        Name: "Aquamarine",
                        Stats: ColorStats.ColorNames.Aquamarine + ColorStats.Colors.Aquamarine
                    },
                    {
                        Name: "Aqua",
                        Stats: ColorStats.ColorNames.Aqua + ColorStats.Colors.Aqua
                    },
                    {
                        Name: "Brown",
                        Stats: ColorStats.ColorNames.Brown + ColorStats.Colors.Brown
                    },
                ];

                const MostUsed = {
                    Red: ColorStats.ColorNames.Red + ColorStats.Colors.Red,
                    Green: ColorStats.ColorNames.Green + ColorStats.Colors.Green,
                    Blue: ColorStats.ColorNames.Blue + ColorStats.Colors.Blue,
                    Yellow: ColorStats.ColorNames.Yellow + ColorStats.Colors.Yellow,
                    Purple: ColorStats.ColorNames.Purple + ColorStats.Colors.Purple,
                    Orange: ColorStats.ColorNames.Orange + ColorStats.Colors.Orange,
                    Black: ColorStats.ColorNames.Black + ColorStats.Colors.Black,
                    Aquamarine: ColorStats.ColorNames.Aquamarine + ColorStats.Colors.Aquamarine,
                    Aqua: ColorStats.ColorNames.Aqua + ColorStats.Colors.Aqua,
                    Brown: ColorStats.ColorNames.Brown + ColorStats.Colors.Brown,
                };


                const Max = Math.max.apply(null, Object.values(MostUsed));
                const MaxObject = MostUsed2.find(e => e.Stats === Max);


                Added_Text = `<p>Most Used: ${MaxObject.Name}</p>`;

                Cache.push(`Last Time Stats:\n`)
                for(entry of MostUsed2) {
                    Cache.push(`Color: ${entry?.Name} | Uses: ${entry?.Stats}\n`)
                }
                Cache.push(`Most used: ${MaxObject?.Name} | ${MaxObject.Stats} uses\n`)



                document.getElementById('infoText').innerHTML = `<p>Created ${runs} Random Colors after ${~~(new Date() - now) / 1000} seconds</p>` +  `<p> Color List: </p>`;

                if(color) {
                    Cache.push(`Last Bet: ${color} was ${color.toLowerCase() === MaxObject?.Name.toLowerCase() ? "Right!" : "Wrong :/"} \n`)

                    alert(color.toLowerCase() === MaxObject?.Name.toLowerCase() ? `Your bet was right with ${Max} uses!` : `Your bet was wrong!`)
                }
            }

        }, i * timeout)
    }
}

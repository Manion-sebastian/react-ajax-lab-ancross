
export default function DisplayCards(props) {
    const allVillagers = props.villagers.map((villager, i) => {
        return (
            <div className="infoContainer" style={{backgroundColor: villager["bubble-color"]}} key={`villagerId${i}`}>
                <div className="imgWrap">
                    <img src={villager.image_uri} alt={villager.name["name-USen"]} style={{borderColor: villager["text-color"]}} />
                </div>
                <div className="infoWrap" style={{color: villager["text-color"]}}>
                    <h1>{villager.name["name-USen"]}</h1>
                    <p>Birthday: {villager["birthday-string"]}</p>
                    <p>{villager.saying}</p>
                    <p></p>
                </div>
            </div>
        )
    })


    return (
        <div>
            {allVillagers}
        </div>
    )
}

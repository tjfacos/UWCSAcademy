import axios from "axios";

export async function getCourseFiles(path) {
    return (await axios.get(`http://file_server:80/courses/${path}`)).data
}

export function styleRawHTML(text, style) {

    let val = text

    for (const tag in style) {
        const regex = new RegExp(`<${tag} (.*)class=\"(g)\"(.*)>`, "g")
        val = val.replaceAll(regex      , `<${tag} $1class=\"$2 ${style[tag]}\">$3` )  // Inserting new classes if there already are some
        val = val.replaceAll(`<${tag}>` , `<${tag} class=\"${style[tag]}\">`        )  // Inserting new classes into a tag where there are none
    }

    return val;

}
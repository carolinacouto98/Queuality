import { SubjectsService } from "./SubjectsService";
import './timeinput.css'
type SubjectsPageProps = {
    service: SubjectsService
}

export default function SubjectsPage({ service }: SubjectsPageProps) {
    return(
        <table className="datetime-tool">
            <tr>
                <td><label htmlFor="time">Time:</label></td>
                <td><input type="time"/></td>
            </tr>
        </table>
    )
}
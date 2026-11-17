import type {Entry} from "@/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpRightFromSquareIcon, PencilIcon, TrashIcon} from "lucide-react";
import {Link} from "@inertiajs/react";
import {LinkButton} from "@/components/shared/link-button.tsx";


type IndexProps = {
    entries: Entry[]
}

export default function Index({ entries }: IndexProps) {

    return (
        <div>

            <h1>My Entries</h1>

            <Button>
                <Link href="/entries/create">Add Entry</Link>
            </Button>
            <div>

                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Unit</th>
                            <th>Completed</th>
                            <th>Total</th>
                            <th>Progress</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map(({ id, title, completed, total, unit }, index) => (
                            <tr key={id}>
                                <th>{index + 1}</th>
                                <td>{title}</td>
                                <td>{unit}</td>
                                <td>{completed}</td>
                                <td>{total}</td>
                                <td>
                                    {(completed / total * 100).toFixed(2)}%
                                    <progress value={completed} max={total}></progress>
                                </td>
                                <td>
                                    <div>
                                        <LinkButton href={`/entries/${id}`}>
                                            <ArrowUpRightFromSquareIcon />
                                            View
                                        </LinkButton>
                                        <LinkButton href={`/entries/${id}/edit`}>
                                            <PencilIcon />
                                            Edit
                                        </LinkButton>
                                        <LinkButton method="delete" href={`/entries/${id}`} variant="destructive">
                                            <TrashIcon />
                                            Delete
                                        </LinkButton>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

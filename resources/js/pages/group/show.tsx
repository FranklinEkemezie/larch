import type {Group} from "@/types.ts";
import {ArrowLeftIcon, PencilIcon, TrashIcon} from "lucide-react";
import {LinkButton} from "@/components/shared/link-button.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@inertiajs/react";

type ShowProps = {
    group: Group
}

export default function Show({ group }: ShowProps) {

    return (
        <div>

            <div>
                <LinkButton href="/groups">
                    <ArrowLeftIcon />
                    Back to Groups
                </LinkButton>

            </div>

            <h1>Group <em>{group.name}</em></h1>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Title</th>
                        <th>Unit</th>
                        <th>Completed</th>
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {group.entries.map(({ id, title, completed, total, unit }, index) => (
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
                                    <Button asChild={true}>
                                        <Link href={`/entries/${id}/edit`}>
                                            <PencilIcon />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" asChild={true}>
                                        <Link method="delete" href={`/entries/${id}`}>
                                            <TrashIcon />
                                            Delete
                                        </Link>
                                    </Button>
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

import { Button } from "@/components/ui/button";
import type {Group} from "@/types.ts";
import {Link} from "@inertiajs/react";
import {ArrowUpRightFromSquareIcon, PencilIcon, TrashIcon} from "lucide-react";

type IndexProps = {
    groups: Group[]
}

export default function Index({ groups }: IndexProps) {

    return (
        <div>

            <h1>My Groups</h1>

            <Button>
                <Link href="/groups/create">Create Group</Link>
            </Button>

            <div>

                {groups.map(({ id, name, entries }) => (
                    <div key={id}>
                        <div>
                            <strong>Name:</strong>
                            {name}
                        </div>

                        <div>
                            <strong>Number of Entries:</strong>
                            {entries.length}
                        </div>

                        <hr/>

                        <Button asChild={true}>
                            <Link href={`/groups/${id}`}>
                                <ArrowUpRightFromSquareIcon />
                                View
                            </Link>
                        </Button>

                        <Button asChild={true}>
                            <Link href={`/groups/${id}/edit`}>
                                <PencilIcon />
                                Edit
                            </Link>
                        </Button>

                        <Button variant="destructive" asChild={true}>
                            <Link method="delete" href={`/groups/${id}`}>
                                <TrashIcon />
                                Delete
                            </Link>
                        </Button>
                    </div>
                ))}

            </div>
        </div>
    )
}

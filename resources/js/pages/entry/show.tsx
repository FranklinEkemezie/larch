import type {Entry, Group} from "@/types.ts";
import {Link} from "@inertiajs/react";

type ShowProps = {
    entry: Entry;
    groups: Group[];
}

export default function Show({ entry, groups }: ShowProps) {

    return (
        <div>
            <h1>Entry <em>{entry.title}</em></h1>

            <div>

                <div>
                    <h2>Groups</h2>

                    <ul>
                        {groups.map((group) => (
                            <li key={group.id}>
                                <Link href={`/groups/${group.id}`}>{group.name}</Link>
                            </li>
                        ))}
                    </ul>


                </div>
            </div>
        </div>
    );
}

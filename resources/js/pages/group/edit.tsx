import type {Entry, Group} from "@/types.ts";
import {useForm} from "@inertiajs/react";
import type {SubmitEventHandler} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type EditProps = {
    group: Group;
    entries: Entry[]
}

export default function Edit({ group, entries }: EditProps) {

    const { data, setData, processing, put, errors } = useForm({
        name: group.name,
        entries: group.entries.map(e => e.id)
    });


    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        put(`/groups/${group.id}`, {

            onSuccess: () => {
                alert('Entry updated successfully!');
            },

            onError: () => {
                alert('Failed to update entry');
            },
        });
    }

    return (
        <div>
            <h1>Update Group</h1>

            <form action="" onSubmit={handleSubmit}>

                <div>
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <div className="text-destructive">{errors.name}</div>
                        <div>
                            <Label>Update entries</Label>

                            <div>
                                {entries.map((entry) => (
                                    <div key={entry.id} className="flex gap-2">
                                        <Label>{entry.title}</Label>
                                        <Input
                                            type="checkbox"
                                            checked={data.entries.includes(entry.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData((data) => ({
                                                        ...data,
                                                        entries: [...data.entries, entry.id]
                                                    }))
                                                } else {
                                                    setData((data) => ({
                                                        ...data,
                                                        entries: [...data.entries.filter(entryId => entry.id !== entryId)]
                                                    }))
                                                }
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>



                    <div>
                        <Button disabled={processing}>Save Changes</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

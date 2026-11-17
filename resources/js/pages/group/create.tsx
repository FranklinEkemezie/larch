import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "@inertiajs/react";
import {Button} from "@/components/ui/button.tsx";
import type {SubmitEventHandler} from "react";
import type {Entry} from "@/types.ts";

type CreateProps = {
    entries: Entry[]
}

export default function Create({ entries }: CreateProps) {

    const { data, setData, processing, post, errors } = useForm({
        name: '',
        entries: [] as string[]
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        post('/groups', {

            onSuccess: () => {
                alert('Entry created');
            },

            onError: () => {
                alert('Failed to create entry');
            },
        });
    }

    return (
        <div>
            <h1>Create a Group</h1>

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <Label>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <div className="text-destructive">{errors.name}</div>
                    </div>

                    <div>
                        <Label>Choose entries</Label>

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

                    <div>
                        <Button disabled={processing}>Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

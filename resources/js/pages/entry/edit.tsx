import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import type {SubmitEventHandler} from "react";
import {useForm} from "@inertiajs/react";
import type {Entry} from "@/types.ts";

type EditProps = {
    entry: Entry
}

export default function Edit({ entry }: EditProps) {


    const { data, setData, processing, put, errors } = useForm({
        title: entry.title,
        unit: entry.unit,
        completed: entry.completed,
        total: entry.total,
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        put(`/entries/${entry.id}`, {

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
            <h1>Update Entry</h1>

            <form action="" onSubmit={handleSubmit}>

                <div>
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <div className="text-destructive">{errors.title}</div>
                    </div>

                    <div>
                        <Label>Unit</Label>
                        <Input
                            value={data.unit}
                            onChange={(e) => setData('unit', e.target.value)}
                        />
                        <div className="text-destructive">{errors.unit}</div>
                    </div>

                    <div>
                        <Label>Completed</Label>
                        <Input
                            type="number"
                            value={data.completed}
                            onChange={(e) => setData('completed', parseFloat(e.target.value))}
                        />
                        <div className="text-destructive">{errors.completed}</div>
                    </div>

                    <div>
                        <Label>Total</Label>
                        <Input
                            type="number"
                            value={data.total}
                            onChange={(e) => setData('total', parseFloat(e.target.value))}
                        />
                    </div>

                    <div>
                        <Button disabled={processing}>Save Changes</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

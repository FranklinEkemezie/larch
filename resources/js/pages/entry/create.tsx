import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "@inertiajs/react";
import {Button} from "@/components/ui/button.tsx";
import type {SubmitEventHandler} from "react";

export default function Create() {

    const { data, setData, processing, post, errors } = useForm({
       title: '',
       unit: '',
        completed: 0,
       total: 0,
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        post('/entries', {

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
            <h1>Create an Entry</h1>

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
                            onChange={(e) => setData('completed', parseFloat(e.target.value || "0"))}
                            min={0}
                        />
                        <div className="text-destructive">{errors.completed}</div>
                    </div>

                    <div>
                        <Label>Total</Label>
                        <Input
                            type="number"
                            value={data.total}
                            onChange={(e) => setData('total', parseFloat(e.target.value || "0"))}
                            min={0}
                        />
                        <div className="text-destructive">{errors.total}</div>
                    </div>

                    <div>
                        <Button disabled={processing}>Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

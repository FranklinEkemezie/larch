import {Link, useForm} from "@inertiajs/react";
import type {SubmitEventHandler} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        post('/signup', {

            onError: () => {

                alert('Failed to register');
            }
        });

    }

    return (
        <div>

            <h1>Register</h1>

            <form action="" onSubmit={handleSubmit}>


                <div>
                    <Label>Name</Label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <div className="text-destructive">{errors.name}</div>
                </div>


                <div>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <div className="text-destructive">{errors.email}</div>
                </div>

                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <div className="text-destructive">{errors.password}</div>
                </div>

                <div>
                    <Label>Confirm Password</Label>
                    <Input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <div className="text-destructive">{errors.password_confirmation}</div>
                </div>

                <div>
                    <Button type="submit" disabled={processing}>Submit</Button>

                    <div>Already have an account? <Link href='/login'>Login</Link></div>
                </div>
            </form>


        </div>
    )
}

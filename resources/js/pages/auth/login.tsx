import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label.tsx";
import {Link, useForm} from "@inertiajs/react";
import {Button} from "@/components/ui/button.tsx";
import type {SubmitEventHandler} from "react";

export default function Login() {

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember_me: false
    });

    const handleSubmit: SubmitEventHandler = (e) => {
        e.preventDefault();

        post('/login', {

            onError: () => {

                alert('Failed to login')
            }
        });

    }

    return (
        <div>

            <h1>Login</h1>

            <form action="" onSubmit={handleSubmit}>


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
                    <Input
                        type="checkbox"
                        checked={data.remember_me}
                        onChange={(e) => setData('remember_me', e.target.checked)}
                    />
                    <Label>Remember Me</Label>
                    <div className="text-destructive">{errors.remember_me}</div>
                </div>

                <div>
                    <Button type="submit" disabled={processing}>Submit</Button>

                    <div>Don't have an account? <Link href='/signup'>Create one</Link></div>
                </div>
            </form>


        </div>
    )
}

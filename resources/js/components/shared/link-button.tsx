import type {ComponentProps} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@inertiajs/react";


type LinkButtonProps =
    ComponentProps<typeof Button> &
    ComponentProps<typeof Link>;

export function LinkButton({ href, method, children, ...props }: LinkButtonProps) {

    return (
        <Button asChild={true} {...props}>
            <Link method={method} href={href}>
                {children}
            </Link>
        </Button>
    )
}

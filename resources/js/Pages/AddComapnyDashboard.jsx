import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import CompaniesForm from "@/Components/Admin/CompaniesForm";

export default function AddComapnyDashboard({auth}) {

    return(
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nowy organizator</h2>}
            >
                <Head title="Nowy organizator"/>

                <CompaniesForm />


            </AuthenticatedLayout>
        </>
    )
}

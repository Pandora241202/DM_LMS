import { Layout as DashboardLayout } from '../../../layouts/dashboard';
export const Page = () => {
    return (
        <h1>LEARNING PATH</h1>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;







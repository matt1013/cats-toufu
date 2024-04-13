import { Markdown } from 'components/markdown';
import { ShapeEditor } from './editor';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext, uploadDisabled } from 'utils';

export const metadata = {
    title: 'Blobs'
};

const explainer = `
[Netlify Blobs](https://docs.netlify.com/blobs/overview/) とうふ屋の猫カフェ

~~~js
'use server';
import { getStore } from '@netlify/blobs';

// TODO: Always be sanitizing data in real sites!
export async function uploadShape({ shapeData }) {
    const blobStore = getStore('shapes');
    const key = data.name;
    await blobStore.setJSON(key, shapeData);
}
~~~

Click "Randomize" to get a shape you like, then hit "Upload".
Choose any existing object to view it.
`;

const uploadDisabledText = `
User uploads are disabled in this site. To run your own and try it out: 
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-platform-starter">
<img src="https://www.netlify.com/img/deploy/button.svg" style="display: inline;" alt="Deploy to Netlify" />
</a>
`;

export default async function Page() {
    return (
        <>
            <section className="flex flex-col gap-6 sm:gap-8">
                <ContextAlert
                    addedChecksFunction={(ctx) => {
                        return uploadDisabled ? uploadDisabledText : null;
                    }}
                />
                <h1>とうふ屋の猫カフェ</h1>
            </section>
            {!!getNetlifyContext() && (
                <div className="flex flex-col gap-8">
                    <Markdown content={explainer} />
                    <ShapeEditor />
                </div>
            )}
        </>
    );
}

import {useEffect, useRef} from 'react';

export default function PreviewOfficeFile({lmId}) {

    const viewer = useRef(null);

    useEffect(() => {
      import('@pdftron/webviewer').then(() => {
        WebViewer(
          {
            path: '/lib',
            initialDoc: `${process.env.NEXT_PUBLIC_SERVER_API}/learning-materials/${lmId}`,
          },
          viewer.current,
        ).then(instance => {
            instance.UI.loadDocument(`${process.env.NEXT_PUBLIC_SERVER_API}/learning-materials/${lmId}`);
        });
      })
    }, []);


    return (
      <div className="MyComponent">
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
      </div>
    );
  
}
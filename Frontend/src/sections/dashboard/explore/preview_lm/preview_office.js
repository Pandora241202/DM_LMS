import {useEffect, useRef} from 'react';
// import { learning_logApi } from '../../../../api/learning-log';
// import { useAuth } from '../../../../hooks/use-auth';


export default function PreviewOfficeFile({lmId}) {

    const viewer = useRef(null);
    // const {user} = useAuth();


    // const createFileLog = async (lmId, user) => {
    //   try {
    //     const response = await learning_logApi.createLog(user.id, {
    //       rating: valueRating,
    //       time: 120, //chỗ này cần phải lấy time của lm sau đó gắn vào
    //       attempts: 1,
    //       learningMaterialId: lmId,
    //     });
    //     console.log(response);
  
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }

    useEffect(() => {
      import('@pdftron/webviewer').then(() => {
        WebViewer(
          {
            path: '/lib',
            initialDoc: `http://localhost:8080/learning-materials/${lmId}`,
          },
          viewer.current,
        ).then(instance => {
            instance.UI.loadDocument(`http://localhost:8080/learning-materials/${lmId}`);
        });
      })
    }, []);

    // useEffect(() => {
    //   try {
    //     createFileLog(parseInt(lmId,10), user)
    //   } catch (err) {
    //     console.error(err);
    //   }}, [valueRating]);

    return (
      <div className="MyComponent">
        <div className="webviewer" ref={viewer} style={{height: "100vh"}}></div>
      </div>
    );
  
}
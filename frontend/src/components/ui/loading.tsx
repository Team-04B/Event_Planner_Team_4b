import React from 'react';
import "../../app/spinner.css"
import { Loader } from 'lucide-react';

const Loading = () => {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className="loader">
          <div className="box">
            <div className="logo">
              <Loader className='animate-spin'/>
            </div>
          </div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
        </div>

    );
};

export default Loading;
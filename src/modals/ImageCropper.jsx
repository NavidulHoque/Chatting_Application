/* eslint-disable react/prop-types */
import { Cropper } from "react-cropper"
import CrossIcon from "../icons/CrossIcon"
import { BeatLoader } from "react-spinners"

const ImageCropper = ({ image, setImage, cropperRef, getCropData, loading }) => {
    
    return (
        <div className="fixed top-0 w-full z-10 bg-[rgba(0,0,0,0.4)] h-screen flex items-center justify-center ">

            <div className="bg-white w-[30%] rounded-md p-[10px] space-y-4">

                <div className="relative">

                    <h2 className="text-[20px] text-center">Upload Photo</h2>

                    <div onClick={() => setImage()} className="absolute top-0 right-0 cursor-pointer">

                        <CrossIcon />

                    </div>

                </div>

                <div className="w-[50px] h-[50px] mx-auto rounded-full overflow-hidden">
                    <div
                        className="img-preview"
                        style={{ width: "100%", float: "left", height: "300px" }}
                    />
                </div>

                <div>
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                    />
                </div>

                <button 
                    onClick={getCropData} 
                    className="bg-lime-600 hover:bg-lime-700 text-white w-full rounded-md py-2"
                >
                    {loading ? <BeatLoader color="#fff" size={5} /> : "Upload"}
                </button>

            </div>

        </div>
    )
}

export default ImageCropper

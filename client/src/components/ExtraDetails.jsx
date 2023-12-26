/* eslint-disable react/prop-types */
import { useState } from "react";

const ExtraDetails = ({setProductData}) => {
    const [details, setDetails] = useState({
        brand: '',
        modelName: '',
        screenSize: '',
        CPUModel: '',
        ramMemory: '',
        romMemory: '',
        operatingSystem: '',
        specialFeature: '',
        graphicsCard: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setDetails({ ...details, [name]: value });

        setProductData((values) => ({
            ...values,
            productDetails: details
        }))
    }
  return (
      <div className="mt-3">
          <h1 className="font-poppins text-xl text-light-1 pb-1 text-center">More Product Details if available:</h1>
          <span className="text-sm font-mono text-light-1 pb-2 text-center block">Provide details which are available for your provide:</span>
          <div className="flex gap-6 flex-wrap">
              <div className="input-container">
                  <label htmlFor="brand">Brand:</label>
                  <input type="text" name="brand" id="brand" placeholder="Product brand..." value={details.brand} onChange={handleChange} />
              </div>
              <div className="input-container">
                  <label htmlFor="modelName">Model Name:</label>
                  <input type="text" id="modelName" name="modelName" placeholder="Product model name..." value={details.modelName} onChange={handleChange} />
              </div>
          </div>
          <div className="flex gap-6 flex-wrap">
              <div className="input-container">
                  <label htmlFor="screenSize">Screen Size:</label>
                  <input type="text" name="screenSize" id="screenSize" placeholder="Product screen size..." value={details.screenSize} onChange={handleChange} />
              </div>
              <div className="input-container">
                  <label htmlFor="CPUModel">CPU Model:</label>
                  <input type="text" id="CPUModel" name="CPUModel" placeholder="Product CPU model..." value={details.CPUModel} onChange={handleChange} />
              </div>
          </div>
          <div className="flex gap-6 flex-wrap">
              <div className="input-container">
                  <label htmlFor="ramMemory">RAM Memory:</label>
                  <input type="text" name="ramMemory" id="ramMemory" placeholder="Product ram memory size..." value={details.ramMemory} onChange={handleChange} />
              </div>
              <div className="input-container">
                  <label htmlFor="romMemory">ROM Memory:</label>
                  <input type="text" id="romMemory" name="romMemory" placeholder="Product ROM Memory..." value={details.romMemory} onChange={handleChange} />
              </div>
          </div>
          <div className="flex gap-6 flex-wrap">
              <div className="input-container">
                  <label htmlFor="operatingSystem">Operating System:</label>
                  <input type="text" name="operatingSystem" id="operatingSystem" placeholder="Product operating system..." value={details.operatingSystem} onChange={handleChange} />
              </div>
              <div className="input-container">
                  <label htmlFor="specialFeature">Special Features:</label>
                  <input type="text" id="specialFeature" name="specialFeature" placeholder="Product Special Features..." value={details.specialFeature} onChange={handleChange} />
              </div>
          </div>
          <div className="flex gap-6 flex-wrap">
              <div className="input-container">
                  <label htmlFor="graphicsCard">Graphics Card:</label>
                  <input type="text" id="graphicsCard" name="graphicsCard" placeholder="Product graphics card..." value={details.graphicsCard} onChange={handleChange} />
              </div>
          </div>
    </div>
  )
}

export default ExtraDetails
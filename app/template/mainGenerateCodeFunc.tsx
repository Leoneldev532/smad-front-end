


export const componentStructure = (titleComponent: string, importLogic:string,logic: string, uiComp: string) => {
    const code = `
${importLogic}
const ${titleComponent} = ()=> {
${logic}
${uiComp}
 }
 export default ${titleComponent}
        `
    return code

}
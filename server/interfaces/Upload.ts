interface Upload {
    filename: string,
    mimetype: string,
    encoding: string,
    createReadStream: () => any
}

export default Upload

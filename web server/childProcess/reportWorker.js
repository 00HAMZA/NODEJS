process.on("message", (data)=>{
    const average = data.totalsales /data.totalorders;

    process.send({
        averageOrderValue : average
    })
})
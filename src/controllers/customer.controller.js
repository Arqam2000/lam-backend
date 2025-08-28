import { pool } from '../../dbConfig.js'

const addReview = async (req, res) => {
    try {
        const { name, designation, remarks, comments, rating } = req.body

        if (!name || !designation || !remarks || !comments || !rating) {
            return res.status(400).json({
                success: false,
                message: "Please provide complete details"
            })
        }

        const [result] = await pool.query("INSERT INTO creview (rdate, cname, designation, remarks, comment, crate) VALUES (NOW(), ?, ?, ?, ?, ?)", [name, designation, remarks, comments, rating])

        if (result.affectedRows == 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot insert the review"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Review created successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the review",
            error
        })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT cr, rdate, cname, designation, comment, crate FROM creview")

        console.log("rows",rows)

        return res.status(200).json({
            success: true,
            message: "Successfuly fetched reviews",
            data: rows
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetched reviews",
            error
        })
    }
}

const getReviews = async (req, res) => {
    try {
       let data = [
        {
            cr: 1, 
            rdate: "27/08/2025", 
            cname: "Muhammad Ahmed", 
            designation: "Engineer", 
            comment: "This is a testing message.", 
            crate: 3
        }
       ]

        return res.status(200).json({
            success: true,
            message: "Successfuly fetched reviews",
            data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetched reviews",
            error
        })
    }
}

export {
    addReview,
    getAllReviews,
    getReviews
}
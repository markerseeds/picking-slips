const db = require('../models');
const { QueryTypes } = require('sequelize');

exports.getAllPickingSlips = async (req, res, next) => {
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const offset = (page - 1) * limit || 0;

    // Constructing the query
    let query = `SELECT ps.order_id, ps.id, psd.printed_at, psd.inspected_at, psd.shipped_at, psd.held_at,
         SUM(is_pre_order) count_of_pre_order_items
         FROM picking_slips ps 
         INNER JOIN picking_slip_items psi ON ps.id = psi.picking_slip_id
         INNER JOIN picking_slip_dates psd ON ps.id = psd.picking_slip_id`;

    // filter by status
    if (req.query.status) {
        if (req.query.status.toLowerCase() === 'held') {
            query += ` WHERE psd.held_at IS NOT NULL`;
        } else if (req.query.status.toLowerCase() === 'printed') {
            query += ` WHERE psd.printed_at IS NOT NULL
                       AND psd.inspected_at IS NULL
                       AND psd.shipped_at IS NULL
                       AND psd.held_at IS NULL`;
        } else {
            query += ` WHERE psd.printed_at IS NULL 
                       AND psd.inspected_at IS NULL
                       AND psd.shipped_at IS NULL
                       AND psd.held_at IS NULL`;
        }
    }

    // Calling the query
    const pickingSlips = await db.sequelize.query(
        (query += ` GROUP BY ps.id ORDER BY ps.created_at DESC LIMIT ${limit} OFFSET ${offset};`),
        { type: QueryTypes.SELECT }
    );

    // Response Data
    let result = pickingSlips.map((pickingSlip) => {
        const object = {};

        object.order_id = pickingSlip.order_id;
        object.picking_slip_id = pickingSlip.id;

        if (pickingSlip.held_at !== null) {
            object.picking_slip_status = 'held';
        } else if (pickingSlip.printed_at !== null) {
            object.picking_slip_status = 'printed';
        } else {
            object.picking_slip_status = 'not printed';
        }

        if (+pickingSlip.count_of_pre_order_items !== 0) {
            object.has_pre_order_item = true;
        } else {
            object.has_pre_order_item = false;
        }

        return object;
    });

    res.status(200).json({
        status: 'success',
        data: result,
    });
};

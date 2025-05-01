//** React */
import React, { Fragment, useState } from 'react';
//** Next.js */
import { NextPage } from 'next';
// ** MUI Imports */
import List from '@material-ui/core/List';
import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// ** ICONIFY Imports */
import IconifyIcon from "src/components/Icon"
import { VerticalItem } from 'src/configs/layout';



type TProps = {

}

const RecursiveListItems = ({ items, level }: { items: any, level: number }) => {
    const [openItems, setOpenItems] = useState<{ [Key: string]: boolean }>({})


    const handleClick = (title: string) => {
        setOpenItems((prev) => ({
            ...prev, [title]: !prev[title]
        }))
    };
    return (
        <>
            {items?.map((item: any) => {
                console.log(">>>>", item.title, level);

                return (
                    <React.Fragment key={item.title}>
                        <ListItemButton
                            style={{
                                display: "flex",
                                padding: `8px 10px 8px ${level * 10}px`,
                            }}
                            onClick={
                                () => {
                                    if (item.childrens) {
                                        handleClick(item.title)
                                    }
                                }
                            }>
                            <ListItemIcon>
                                <IconifyIcon icon={item.icon} />
                            </ListItemIcon>
                            <ListItemText primary={item?.title} />
                            {item?.childrens && item?.childrens.length > 0 ? (
                                openItems[item.title] ? <IconifyIcon icon="eva:arrow-ios-upward-fill" /> : <IconifyIcon icon="eva:arrow-ios-downward-fill" />
                            ) : null}

                        </ListItemButton>
                        {
                            item?.childrens && item?.childrens.length > 0 && (
                                <>
                                    <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                                        <RecursiveListItems items={item.childrens} level={level + 1} />
                                    </Collapse>
                                </>
                            )
                        }
                    </React.Fragment >
                )
            })}
        </>
    )
}

const ListVerticalLayout: NextPage<TProps> = () => {

    const [openState, setOpenState] = React.useState(true);

    const handleClick = () => {
        setOpenState(!openState);
    };
    return (
        <List
            style={{ width: '100%', display: "flex", flexDirection: "column", maxWidth: 360, backgroundColor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <RecursiveListItems items={VerticalItem} level={1} />
        </List >
    )
}

export default ListVerticalLayout;
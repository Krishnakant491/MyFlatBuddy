// import {  } from 'lucide-react'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useSelector } from 'react-redux';

const ApplicantsTable = () => {
    const  {applicants}  = useSelector((store) => store.applications);
    // console.log(applicants)

  return (
    <div className='min-h-[50vh]'>
         <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FirstName</TableHead>
                        <TableHead>LastName</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {
                        applicants?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant.firstName || 'N/A'}</TableCell>
                                <TableCell>{item?.applicant.lastName || 'N/A'}</TableCell>
                                <TableCell>{item?.applicant.phoneNumber || 'N/A'}</TableCell>
                                <TableCell>{item?.applicant.role || 'N/A'}</TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    </div>
  )
}

export default ApplicantsTable